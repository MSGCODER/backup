package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/7/29.
 */
public class ModuoVrPageProcessor extends HulkPageProcessor {

    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.moduovr\\.com/article/\\w+\\.html").all());
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.moduovr\\.com/category/\\w+\\.html").all());
    }

    public Element getArticle(Document document){
        return document.select("article.box-grid").first();
    }

    @Override
    String getTitle(Element article) {
        Element h1 = article.getElementsByTag("h1").first();
        if(h1 != null){
            return h1.ownText();
        }
        return null;
    }

    @Override
    String getCoverImage(Element article) {
        Element articleContent = article.select("section.panel-article").get(2);
        Element img = null;
        if(articleContent != null){
            img = articleContent.select("p img").first();
        }
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    String getContent(Element article) {
        Element element = article.select("section.panel-article").get(2) ;
        if(element != null){
            return handleHtml(element.outerHtml());
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "魔多VR";
    }

    String handleHtml(String content){
        content = content.replaceAll("<p><br></p>", "");
        content = content.replaceAll("<br>", "");
        content = content.replaceAll("class=\"[^>]*\"", "");
        content = content.replaceAll("<div.*>", "");
        content = content.replaceAll("</div>", "");
        return content;
    }
}
