const jwt = require('jsonwebtoken');

// 헤더에 토큰이 있어야 다음으로 진행되는 코드 부분
// 토큰 인증이 필요한 부분에서 이 부분을 가져다 쓰면 된다.
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            chk_msg: "인증 실패"
        });
    }
};