package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/7/28.
 */
public class LeiphonePageProcessor extends HulkPageProcessor {

    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.leiphone\\.com/category/\\w+").all());
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.leiphone\\.com/category/\\w+/.*").all());
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.leiphone\\.com/news/\\d+/.+\\.html").all());
    }

    @Override
    Element getArticle(Document document){
        return document.select("div.article-left").first();
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
        Element img = article.select("p img").first();
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    String getContent(Element article) {
        Element content = article.getElementsByClass("pageCont").first();
        if(content != null){
            content.removeAttr("*");
            return content.outerHtml();
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "雷锋网";
    }
}
