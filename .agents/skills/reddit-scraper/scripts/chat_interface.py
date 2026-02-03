import sys
from fetch_posts import get_latest_posts

def chat_loop():
    print("🤖 Reddit Collector Bot: Hello! I can fetch the latest posts from any subreddit for you.")
    print("🤖 Reddit Collector Bot: Type a subreddit name (e.g. 'n8n') to see the top 3 posts. Type 'exit' to quit.")

    while True:
        try:
            # Get user input
            user_input = input("\n👤 You: ").strip()
            
            if user_input.lower() in ['exit', 'quit', 'bye']:
                print("🤖 Reddit Collector Bot: Goodbye! 👋")
                break
            
            if not user_input:
                continue
                
            print(f"🤖 Reddit Collector Bot: Checking r/{user_input}...")
            
            posts = get_latest_posts(user_input)
            
            if posts:
                print(f"🤖 Reddit Collector Bot: Here are the latest 3 posts from r/{user_input}:\n")
                for i, post in enumerate(posts, 1):
                    title = post['title']
                    url = post['url']
                    print(f"   {i}. {title}")
                    print(f"      🔗 {url}")
            else:
                print(f"🤖 Reddit Collector Bot: I couldn't find any posts for r/{user_input}. Maybe check the spelling?")
                
        except KeyboardInterrupt:
            print("\n🤖 Reddit Collector Bot: Goodbye! 👋")
            break
        except Exception as e:
            print(f"🤖 Reddit Collector Bot: Oops, something went wrong: {e}")

if __name__ == "__main__":
    chat_loop()
