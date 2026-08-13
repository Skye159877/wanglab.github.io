let wikiData = [];


// ==============================
// 加载 Wiki 索引
// ==============================

async function loadWikiIndex() {

  try {

    const response = await fetch("wiki/index.json");

    wikiData = await response.json();

    renderWikiList(wikiData);

  } catch (error) {

    console.error("Wiki 索引加载失败：", error);

  }

}


// ==============================
// 显示 Wiki 目录
// ==============================

function renderWikiList(data) {

  const list = document.getElementById("wiki-list");

  list.innerHTML = "";

  data.forEach(article => {

    const li = document.createElement("li");

    const link = document.createElement("a");

    link.href = "#";

    link.innerHTML =
      `${article.title}<br>
       <span class="wiki-en">
       ${article.title_en}
       </span>`;

    link.addEventListener("click", function(event) {

      event.preventDefault();

      loadWikiArticle(article.file);

    });

    li.appendChild(link);

    list.appendChild(li);

  });

}


// ==============================
// 加载 Markdown Wiki
// ==============================

async function loadWikiArticle(filename) {

  try {

    const response = await fetch(
      `wiki/${filename}`
    );

    const markdown =
      await response.text();

    const html =
      marked.parse(markdown);

    document.getElementById(
      "wiki-content"
    ).innerHTML = html;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  catch (error) {

    document.getElementById(
      "wiki-content"
    ).innerHTML =
      "<h2>词条加载失败</h2>";

  }

}


// ==============================
// 搜索 Wiki
// ==============================

function searchWiki(keyword) {

  keyword =
    keyword.toLowerCase().trim();

  if (!keyword) {

    renderWikiList(wikiData);

    return;

  }


  const results =
    wikiData.filter(article => {

      const text = [

        article.title,

        article.title_en,

        article.category,

        ...article.keywords

      ].join(" ").toLowerCase();


      return text.includes(keyword);

    });


  renderWikiList(results);

}


// ==============================
// 搜索框监听
// ==============================

document
  .getElementById("wiki-search")
  .addEventListener(
    "input",
    function(event) {

      searchWiki(
        event.target.value
      );

    }
  );


// ==============================
// 初始化
// ==============================

loadWikiIndex();