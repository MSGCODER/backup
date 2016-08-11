package com.aiztone.hulk.spider.processor;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import us.codecraft.webmagic.Page;

/**
 * Created by lenn on 16/8/2.
 */
public class YivianPageProcessor extends HulkPageProcessor {

    @Override
    void addTargetRequests(Page page) {
        page.addTargetRequests(page.getHtml().links().regex("http://yivian\\.com/\\d{4}/\\d{2}/\\d{2}/.*").all());
        page.addTargetRequests(page.getHtml().links().regex("http://yivian\\.com/category/.*").all());
    }

    @Override
    Element getArticle(Document document){
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
        Element img = article.getElementsByTag("p").select("img").first();
        if(img != null){
            return img.attr("src");
        }
        return null;
    }

    @Override
    String getContent(Element article) {
        Element element = article.getElementsByClass("entry-inner").first();
        if(element != null){
            Elements paragraphs = element.getElementsByTag("p");
            StringBuffer content = new StringBuffer();
            for(int i = 0; i < paragraphs.size(); i++){
                Element paragraph = paragraphs.get(i);
                content.append(paragraph.outerHtml());
            }
            return content.toString();
        }
        return null;
    }

    @Override
    String getSourceName() {
        return "YIVIAN";
    }
}
