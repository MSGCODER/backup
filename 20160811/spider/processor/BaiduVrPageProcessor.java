package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/7/28.
 */
public class BaiduVrPageProcessor extends HulkPageProcessor {
    @Override
    public String getTitle(Element article) {
        Element h1 = article.select("h1").first();
        if(h1 != null){
            return h1.ownText();
        }
        return null;
    }

    @Override
    public String getCoverImage(Element article) {
        Element img = article.select("div.arc-body img").first();
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    public String getContent(Element article) {
        Element element = article.select("div.arc-body").first();
        if(element != null){
            return element.outerHtml();
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "百度 VR";
    }

    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://ivr\\.baidu\\.com/.+").all());
    }

    @Override
    public Element getArticle(Document document){
        return document.select("div.arc-box").first();
    }

}
