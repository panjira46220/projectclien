

const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users
let student = db.student

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let trees = {
    list: [
        { id: 1, name: 'ต้นพุดชมพู', number: 1, price: 2000, imageurl:"https://co.lnwfile.com/q0zg1k.jpg"} ,
        { id: 2, name: 'ต้นมะลิซ้อน', number: 3,  price: 3000, imageurl:"https://th-live-02.slatic.net/p/121065040894e26b73227d8c5cff8abd.jpg"}
    ]
}
let income = 0

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

;

    router.route('/trees')
    .get((req, res) => res.json(trees.list))
    .post((req, res) => {
        console.log(req.body)
        let newTree = {}
        newTree.id = (trees.list.length) ? trees.list[trees.list.length - 1].id + 1 : 1
        newTree.name = req.body.name
        newTree.number = req.body.number
        newTree.price = req.body.price
        imageurl.price = req.body.imageurl
        trees = { "list": [...trees.list, newTree] }
        res.json(trees.list)
    })

router.route('/trees/:tree_id')
    .get((req, res) => {
        const tree_id = req.params.tree_id
        const id = trees.list.findIndex(item => +item.id === +tree_id)
        res.json(trees.list[id])
    })
    .put((req, res) => {
        const tree_id = req.params.tree_id
        const id = trees.list.findIndex(item => +item.id === +tree_id)
        trees.list[id].id = req.body.id
        trees.list[id].name = req.body.name
        trees.list[id].number = req.body.number
        trees.list[id].price = req.body.price
        trees.list[id].imageurl = req.body.imageurl
        res.json(trees.list)
    })
    .delete((req, res) => {
        const tree_id = req.params.tree_id
        trees.list = trees.list.filter(item => +item.id !== +tree_id)
        res.json(trees.list)
    })



router.route('/income')
    .get((req, res) => res.json(income))



router.route('/purchase/:tree_id')
    .delete((req, res) => {
        const tree_id = req.params.tree_id
        const id = trees.list.findIndex(item => +item.id === +tree_id)
        console.log('TreeID: ', tree_id, 'ID: ', id)
        if (id !== -1) {
            income += trees.list[id].price
            trees.list = trees.list.filter(item => +item.id !== +tree_id)
            res.json(trees.list)
        }
        else {
            res.send('Not found')

        }
    })

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.put('/retrees/:tree_id',
     async (req, res) => {   
        const tree_id = req.params.tree_id
        const id = trees.list.findIndex(item => +item.id === +tree_id)
        if (trees.list[id].number > 0)
            trees.list[id].number--
            res.json(req.trees)
    
    })
    
router.put('/addtree/:tree_id',
    async (req, res) => {     
        const tree_id = req.params.tree_id
        const id = trees.list.findIndex(item => +item.id === +tree_id)
        trees.list[id].number++
            res.json(req.trees)
    })


router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

