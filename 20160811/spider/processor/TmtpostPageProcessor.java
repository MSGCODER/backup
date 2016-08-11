package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/7/29.
 */
public class TmtpostPageProcessor extends HulkPageProcessor {

    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.tmtpost\\.com/\\w+\\.html").all());
        page.addTargetRequests(page.getHtml().links().regex("http://www\\.tmtpost\\.com/tag/.+").all());
    }

    public Element getArticle(Document document){
        return document.getElementsByTag("article").first();
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
        Element img = article.getElementsByTag("img").first();
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    String getContent(Element article) {
        Element element = article.getElementsByClass("inner").first();
        if(element != null){
            return element.outerHtml();
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "钛媒体";
    }
}
