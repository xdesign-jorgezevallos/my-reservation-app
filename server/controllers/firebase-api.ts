import {signInEmailAndPassword} from "../services/auth";

const expressRouter = require("express")
const router = expressRouter.Router()

router.get('/', function(req:any, res:any) {
    res.send('Hello from APIv1 root route.');
});

router.post('/login', async function(req:any, res:any) {
    const username = req.body.username
    const password = req.body.password
    try {
        const result = await signInEmailAndPassword(username, password)
        res.send(result);
    } catch(e){
        // @ts-ignore
        return e.code
    }
});

module.exports = router;
