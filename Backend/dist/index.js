"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
// import * as bcrypt from 'bcrypt'; 
const util_1 = require("./util");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const saltRounds = 10; 
app.post("/api/vi/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    // const salt=await bcrypt.genSalt(saltRounds)
    // const hashedPassword=await bcrypt.hash(password,salt)
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "You are signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "Username already exists"
        });
    }
}));
app.post("/api/vi/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    // const salt=await bcrypt.genSalt(saltRounds)
    // const hashedPassword=await bcrypt.hash(password,salt)
    const existingUser = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_PASSWORD);
        res.send({
            token
        });
    }
    else {
        res.status(411).json({
            message: "Invalid credentials"
        });
    }
}));
app.post("/api/vi/content", middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/vi/content", middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.send({
        content
    });
}));
app.delete("/api/vi/content", middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.send({
        message: "Content deleted"
    });
}));
app.post("/api/vi/brain/share", middleware_1.Authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, util_1.random)(10);
        yield db_1.LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.send({
            Link: hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.send({
            message: "Removed Link"
        });
    }
}));
app.post("/api/vi/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(404).json({
            message: "Content not found"
        });
    }
    else {
        const content = yield db_1.ContentModel.find({
            // @ts-ignore
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            //@ts-ignore
            _id: link.userId
        });
        if (!user) {
            res.sendStatus(404).json({
                message: "Link invalid"
            });
            return;
        }
        res.send({
            username: user === null || user === void 0 ? void 0 : user.username,
            content: content
        });
    }
}));
app.listen(3000);
