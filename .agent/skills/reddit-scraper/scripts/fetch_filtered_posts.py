import requests
import sys
import argparse
from urllib.parse import quote_plus

def search_posts(subreddit, query, sort='top', time_filter='week', limit=3):
    # Construct the search URL
    # https://www.reddit.com/r/{subreddit}/search.json?q={query}&restrict_sr=1&sort={sort}&t={time_filter}&limit={limit}
    encoded_query = quote_plus(query)
    url = f"https://www.reddit.com/r/{subreddit}/search.json?q={encoded_query}&restrict_sr=1&sort={sort}&t={time_filter}&limit={limit}"
    
    headers = {
        'User-Agent': 'MyRedditBot/1.0 (by /u/python_local_tester)'
    }
    
    print(f"Searching in r/{subreddit} for '{query}'...")
    print(f"URL: {url}")
    
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
            print("No results found or unexpected API response structure.")
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

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Search for posts in a subreddit.')
    parser.add_argument('subreddit', help='The subreddit to search in')
    parser.add_argument('query', help='The search query')
    parser.add_argument('--limit', type=int, default=3, help='Number of posts to return')
    parser.add_argument('--sort', default='top', help='Sort order (relevance, hot, top, new, comments)')
    parser.add_argument('--time', default='week', help='Time filter (hour, day, week, month, year, all)')

    args = parser.parse_args()

    posts = search_posts(args.subreddit, args.query, args.sort, args.time, args.limit)
    
    if posts:
        print(f"\nFound {len(posts)} posts:\n")
        for i, post in enumerate(posts, 1):
            print(f"--- Post {i} ---")
            print(f"Title: {post['title']}")
            print(f"Author: u/{post['author']}")
            print(f"Score: {post['score']}")
            print(f"URL: {post['url']}")
            # print(f"Preview: {post['selftext']}")
            print("")
    else:
        print("No posts found matching the criteria.")
