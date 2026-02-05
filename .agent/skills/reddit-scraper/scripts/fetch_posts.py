import requests
import sys
import argparse

def get_posts(subreddit, sort='new', time_filter='all', limit=3):
    """
    Fetch posts from a subreddit using the specified sort order and time filter.
    sort: 'new', 'hot', 'top', 'rising', 'controversial'
    time_filter: 'hour', 'day', 'week', 'month', 'year', 'all' (applies to top/controversial)
    """
    base_url = f"https://www.reddit.com/r/{subreddit}/{sort}.json"
    params = {
        'limit': limit,
        't': time_filter
    }
    url = f"{base_url}?limit={limit}&t={time_filter}"
    
    headers = {
        'User-Agent': 'MyRedditBot/1.0 (by /u/python_local_tester)'
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 429:
            print("Rate limited. Please try again later.")
            return []
        elif response.status_code == 404:
            print(f"Subreddit r/{subreddit} not found.")
            return []
            
        response.raise_for_status()
        
        data = response.json()
        
        if 'data' not in data or 'children' not in data['data']:
            print("Unexpected API response structure.")
            return []
            
        posts = data['data']['children']
        
        results = []
        for post in posts:
            post_data = post['data']
            results.append({
                'title': post_data.get('title'),
                'author': post_data.get('author'),
                'url': post_data.get('url'),
                'score': post_data.get('score'),
                'created_utc': post_data.get('created_utc'),
                'selftext': post_data.get('selftext', '')[:200].replace('\n', ' ') + "..." if post_data.get('selftext') else ""
            })
            
        return results
        
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return []
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

def get_latest_posts(subreddit, limit=3):
    """
    Wrapper for backward compatibility. Fetches 'new' posts.
    """
    return get_posts(subreddit, sort='new', limit=limit)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Fetch posts from a subreddit.')
    parser.add_argument('subreddit', help='The subreddit to fetch from')
    parser.add_argument('--sort', default='new', choices=['new', 'hot', 'top', 'rising', 'controversial'], help='Sort order')
    parser.add_argument('--time', default='all', choices=['hour', 'day', 'week', 'month', 'year', 'all'], help='Time filter (for top/controversial)')
    parser.add_argument('--limit', type=int, default=3, help='Number of posts to return')

    # Handle legacy call where only subreddit might be passed without flags, 
    # but argparse handles positional args well. 
    # If the user runs `python fetch_posts.py n8n`, subreddit='n8n', defaults apply.
    
    args = parser.parse_args()
        
    print(f"Fetching posts from r/{args.subreddit} (Sort: {args.sort}, Time: {args.time})...\n")
    posts = get_posts(args.subreddit, sort=args.sort, time_filter=args.time, limit=args.limit)
    
    if posts:
        for i, post in enumerate(posts, 1):
            print(f"--- Post {i} ---")
            print(f"Title: {post['title']}")
            print(f"Author: u/{post['author']}")
            print(f"Score: {post['score']}")
            print(f"URL: {post['url']}")
            if post['selftext']:
                print(f"Content Preview: {post['selftext']}")
            print("")
    else:
        print("No posts found or unable to fetch.")
