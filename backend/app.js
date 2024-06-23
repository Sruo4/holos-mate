const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 配置MySQL连接
const pool = mysql.createPool({
  host: '121.40.149.112', // 例如 'localhost' 或 'your-database-url'
  user: 'root',
  password: 'MMTvTnp2i2cgH5',
  database: 'holos-mate',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 用户注册
app.post('/register', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('用户名和密码是必须的');
  }

  // 加密密码
  const hashedPassword = bcrypt.hashSync(password, 8);
  const userUuid = uuidv4(); // 使用不同的变量名

  // 插入用户数据
  pool.query('INSERT INTO users (uuid, username, password) VALUES (?, ?, ?)', [userUuid, username, hashedPassword], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('注册失败');
    }

    res.status(201).send('注册成功');
  });
});

// 用户登录
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 查询用户
  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('登录失败');
    }
    if (results.length === 0) {
      return res.status(404).send('用户不存在');
    }

    const user = results[0];

    // 验证密码
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send('密码错误');
    }

    // 生成JWT
    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });

    res.status(200).send({ auth: true, token });
  });
});

app.get('/search', (req, res) => {
  console.log(req.query);
  req.query.keyword

  const { keyword } = req.query

  //判断keyword前两个字符是否为“分类”
  if (keyword.slice(0, 2) === '分类') {
    //  切分字符串，去掉“分类：”，","后切分为数组
    const categories = keyword.slice(3).split(',');
    // 生成查询字符串
    console.log(categories);
    const query = categories.map(() => '?').join(',');
    // 查询数据库
    pool.query(`SELECT * FROM disease WHERE category IN (${query})`, categories, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('搜索失败');
      }
      console.log(results);

      res.status(200).send(results);
    });
    return;


  }else if (keyword.slice(0, 2) === '全部') {
    pool.query('SELECT * FROM disease', (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('搜索失败');
      }
      console.log(results);

      res.status(200).send(results);
    });
    return;
  }

  pool.query('SELECT * FROM disease WHERE name LIKE ?', [`%${keyword}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('搜索失败');
    }
    console.log(results);

    res.status(200).send(results);
  });
}
);

//根据疾病id获取疾病详情
app.get('/detail/:id', (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  pool.query('SELECT * FROM disease WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('获取疾病详情失败');
    }
    console.log(results);

    res.status(200).send(results[0]);
  });
});

// 启动Express应用


app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));