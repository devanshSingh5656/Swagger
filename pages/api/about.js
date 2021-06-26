import DB from "../../Component/middleware/conn";
import jwtoken from "jsonwebtoken";
import User from "../../Component/middleware/UserSchema";
import Cookies from "cookies";
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Api's For User
 */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Login (By Email and Password).
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: devanshsingh0808@gmail.com
 *               password:
 *                 type: string
 *                 example: NopB1597@
 *     responses:
 *       200:
 *         description: User Details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: user token id
 *                 user:
 *                   type: object
 *                   description: user details
 *                   properties:
 *                     _id:
 *                       type: string
 *                     id:
 *                       type: number
 *                     firstName:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *                     verified:
 *                       type: boolean
 *                     role:
 *                       type: array
 *                       description: type of user
 *                       items:
 *                         type: string
 *
 *
 *                     type:
 *                       type: string
 *                     provider:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                     modified_at:
 *                       type: string
 *                     loginAttempt:
 *                       type: number
 *                     settings:
 *                       type: object
 *                       properties:
 *                         advertisementSettings:
 *                           type: boolean
 *                         automaticallyApplyCoupons:
 *                           type: boolean
 *                         findLowestCostItem:
 *                           type: boolean
 *                         alertofSlipperyFloors:
 *                           type: boolean
 *                         ratings:
 *                           type: boolean
 *                         budgetLimit:
 *                           type: boolean
 *                         updatedAt:
 *                           type: string
 *                     dwollaCustomerID:
 *                       type: string
 *                     stripeCustomerID:
 *                       type: string
 *       401:
 *         description: Access token is missing or invalid
 *
 *
 *
 */

const handeler = async (req, res) => {
  const cookies = new Cookies(req, res);
  if (req.method == "GET") {
    try {
      const cook = cookies.get("jwtverify");

      const verifyToken = jwtoken.verify(cook, process.env.SECRET);
      const rootUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": cook,
      });
      if (!rootUser) {
        throw new Error("user not found");
      }
      res.send(rootUser);
    } catch (err) {
      res.status(401).send("unautherised");
      console.log(err);
    }
  }
};
export default DB(handeler);
