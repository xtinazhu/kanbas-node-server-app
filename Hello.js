// console.log("Hello World!");
export default function Hello(app) {
    app.get("/hello", (req, res) => {
        res.send('Life is good!')
    }) // create a route that responds 'hello'
    app.get('/', (req, res) => {
        res.send("Welcome to Full Stack Development!")
    })
}