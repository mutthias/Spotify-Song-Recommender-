> As of 2025, this project is quite outdated since I developed it back in 2023. This project is displayed as a testament to my growth
> since this was a project I tried to develop completely independent of tutorials and only by reading docs/stack overflow pages.

# Spotify Song Recommender

If there's one thing I think Spotify can improve on, it's Spotify radio. It often gives recommendations that are songs I already
have saved, or just seem completely unrelated to the original song! So I decided to do something about it.

Using the Spotify API, I utilized song attributes such as its lyrics, tempo, liveness, energy, etc..., and provided more accurate 
recommendations based on the inputted song. This allowed me to find tracks that actually sounded just like it and weren't
just some random track recommendation based on my overall listening activity. Just for fun, I made it so I'm able to track what my 
top artists/songs were in the last month, six months, and year.

Recommendations aren't always perfect, so I made it so that I could refresh the results to give me a set of new tracks.

This fullstack app was built with React on the frontend, and an Express.js server powered by Node.js on the backend. It utilizes a proper
OAuth 2.0 flow with both implicit grants and/or token based logins to access user data and play tracks on the webpage. 

