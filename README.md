## What is this?
This is a template Typescript Express.js server with a React.js client for quick boosted bootstrapping.

## Ready to mod it to your needs?
First, get it from the source:
```bash
git clone https://github.com/charlescaseymartin/ts-express-react-app.git
```

Then, run the development server:
```bash
yarn dev
```

Open [http://localhost:8000](http://localhost:8000) and [http://localhost:3000](http://localhost:3000)
with your browser to see the result.\
You can start editing the server by modifying `./src/index.ts`
and editing the client by modifying `./client/src/index.tsx`.\
The page auto-updates as you edit the file.

## Need it contained?
I`ve got you!

Build the image from source:
```bash
docker build -t ts-express-react-app .
```

Then run the create a container from it:
```bash
docker run --rm -dp 8000:8000 ts-express-react-app
```

## Thanks for stopping by!
Enjoy this easy-of-life boilerplate template and happy hacking!
