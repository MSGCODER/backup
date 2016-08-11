package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/8/3.
 */
public class VrzyPageProcessor extends HulkPageProcessor {
    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.vrzy\\.com/vr/.+\\.html").all());
    }

    @Override
    Element getArticle(Document document) {
        return document.select("div.article-wrap").first();
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
        Element img = article.select("div.article-img-box img").first();
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    String getContent(Element article) {
        Element element = article.select("div#article_content").first();
        if(element != null){
            return element.outerHtml();
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "VR资源网";
    }
}
