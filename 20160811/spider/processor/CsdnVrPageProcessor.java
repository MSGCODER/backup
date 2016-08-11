package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/7/26.
 */
public class CsdnVrPageProcessor extends HulkPageProcessor {

    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://lib\\.csdn\\.net/article/vr/\\w+").all());
        page.addTargetRequests(page.getHtml().links().regex("http://lib\\.csdn\\.net/node/vr/\\w+").all());
        page.addTargetRequests(page.getHtml().links().regex("http://lib\\.csdn\\.net/base/vr\\?.*").all());
    }

    @Override
    Element getArticle(Document document) {
        return document.select("div.maincontent").first();
    }

    @Override
    String getTitle(Element article) {
        Element h1 = article.select("h1").first();
        if(h1 != null){
            return h1.ownText();
        }
        return null;
    }

    @Override
    String getCoverImage(Element article) {
        Element img = article.select("div.divtexts img").first();
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    String getContent(Element article) {
        Element content = article.select("div.divtexts").first();
        if(content != null){
            content.select("pre").remove();
            content.select("*").removeAttr("style");
            String text = content.outerHtml();
            return text;
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "CSDN VR";
    }
}
