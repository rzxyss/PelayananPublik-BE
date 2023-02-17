import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Account = db.define('data_account',{
    name:{
        type: DataTypes.STRING
    },
    username:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    access_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export default Account;

(async()=>{
    await db.sync();
})();