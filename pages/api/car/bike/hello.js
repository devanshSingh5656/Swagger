// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DB from "../../../../Component/middleware/conn";
import User from "../../../../Component/middleware/UserSchema";
/**
 * @swagger
 * tags:
 *   name: bike
 *   description: Api's For User
 */

/**
 * @swagger
 * /api/bike:
 *   post:
 *     summary: Login (By Email and Password).
 *     tags:
 *       - bike
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
  if (req.method == "PUT") {
    const { _id, name, email, phone, work } = req.body;
    // const { _id } = req.param.id;
    // const _id = "60a609e2a1862032548cdefd";
    // const id = _id;

    try {
      if (!email || !name || !work || !phone) {
        res.json({ error: "please fill all" });
      } else {
        const data = await User.findByIdAndUpdate(
          { _id },
          {
            $set: {
              name,
              email,
              work,
              phone,
            },
          }
        );
        console.log(data);
      }
    } catch (err) {
      res.json(err);
    }
  }
};
export default DB(handeler);
