package com.aiztone.hulk.spider.processor;

import com.aiztone.hulk.util.HtmlUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;

/**
 * Created by lenn on 16/7/26.
 */
public abstract class HulkPageProcessor implements PageProcessor {

    @Override
    public void process(Page page){
        System.out.println("handling " + page.getUrl().get());
        // 添加目标链接
        addTargetRequests(page);
        // 获取页面文档
        Document document = page.getHtml().getDocument();
        // 去除样式
        HtmlUtils.removeStyle(document);
        // 解析页面
        Element article = getArticle(document);
        if(article != null){
            String title = getTitle(article);
            String content = getContent(article);
            String coverImage = getCoverImage(article);
            String source = page.getUrl().get();

            page.putField("title", title);
            page.putField("content", content);
            page.putField("coverImage", coverImage);
            page.putField("source", source);
            page.putField("publishTime", null);
            page.putField("sourceName", getSourceName());

            // 解析不到相应的数据,跳过,不处理该页面
            if(title == null){
                page.setSkip(true);
            }
        }else {
            page.setSkip(true);
        }
    }

    abstract void addTargetRequests(Page page);

    abstract Element getArticle(Document document);

    abstract String getTitle(Element article);

    abstract String getCoverImage(Element article);

    abstract String getContent(Element article);

    abstract String getSourceName();

    @Override
    public Site getSite(){
        return Site.me().setRetryTimes(3).setSleepTime(1000);
    }
}
