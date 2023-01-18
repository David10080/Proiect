const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();

let blogs = [
  {
    id: "1",
    title: "Mercedes W14 may be no closer to Red Bull at start of 2023, says Wolff",
    avatar: "images/news1.jpg",
    intro:
      "Mercedes boss Toto Wolff insists his squad remains cautious about its Formula 1 hopes for 2023, and is even braced for not having closed the gap to Red Bull yet.",
    link: "https://www.autosport.com/f1/news/mercedes-w14-may-be-no-closer-to-red-bull-at-start-of-2023-says-wolff/10421709/",
  },
  {
    id: "2",
    title: "Bottas wants talks over Alfa Romeo F1 future quite early in 2023",
    avatar: "images/news2.jpg",
    intro:
      "Valtteri Bottas is keen to discuss his future with Alfa Romeo’s Formula 1 team “quite early” in 2023 as he looks for continued stability.",
    link: "https://www.autosport.com/f1/news/bottas-wants-talks-over-alfa-romeo-f1-future-quite-early-in-2023/10422068/",
  },
  {
    id: "3",
    title: "FIA overhauls F1 management structure",
    avatar: "images/news3.jpg",
    intro:
      "The FIA has appointed the highly-respected former team manager Steve Nielsen as its sporting director inside a new Formula 1 structure.",
    link: "https://www.autosport.com/f1/news/fia-overhauls-f1-management-structure/10421983/",
  },
  {
    id: "4",
    title: "Gasly put emotions aside in decision to leave AlphaTauri F1",
    avatar: "images/news4.jpg",
    intro:
      "Pierre Gasly had to “put emotions aside” in deciding to leave his AlphaTauri Formula 1 “family” and make the step up to Alpine for the 2023 season.",
    link: "https://www.autosport.com/f1/news/gasly-had-to-put-emotions-aside-in-decision-to-leave-alphatauri-f1/10420703/",
  },
  {
    id: "5",
    title: "F1 hopes 2026 engine rules level the playing field for new manufacturers",
    avatar: "images/news5.jpg",
    intro:
      "Formula 1 hopes the new engine rules for 2026 help “level the playing field” for ...",
    link: "https://www.autosport.com/f1/news/f1-hopes-2026-engine-rules-level-the-playing-field-for-new-manufacturers/10421000/",
  },
  {
    id: "6",
    title: "Albon still finding F1 radio “sweet spot” at Williams after early aggression",
    avatar: "images/news6.jpg",
    intro:
      "Alex Albon is still working on finding the “sweet spot” with his Williams Formula 1 radio communications after ...",
    link: "https://www.autosport.com/f1/news/albon-still-finding-f1-radio-sweet-spot-at-williams-after-early-aggression/10421043/",
  },
];

const db = new sqlite3.Database("db.sqlite", (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(
  `CREATE TABLE blog (id INTEGER PRIMARY KEY AUTOINCREMENT, title text,avatar text,intro text, link text)`,
  (err) => {
    if (err) {
      // console.log(err)
      // Table already created
    } else {
      // Table just created, creating some rows
      var insert = "INSERT INTO blog (title, avatar, intro, link) VALUES (?,?,?,?)";
      blogs.map((blog) => {
        db.run(insert, [
          `${blog.title}`,
          `${blog.avatar}`,
          `${blog.intro}`,
          `${blog.link}`,
        ]);
      });
    }
  }
);

app.use(express.static(path.join(__dirname, "public")));

//Front-end connections
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/blogs", async (req, res) => {
  db.all("select * from blog", (err, rows) => {
    if (err) return err;
    res.status(200).json({
      rows,
    });
  });
});

app.listen(8000, () => console.log("Server is running on Port 8000"));
