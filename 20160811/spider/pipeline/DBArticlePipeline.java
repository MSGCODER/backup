package com.aiztone.hulk.spider.pipeline;

import com.aiztone.hulk.dao.entities.Article;
import com.aiztone.hulk.enums.ArticleStatus;
import com.aiztone.hulk.service.ArticleService;
import us.codecraft.webmagic.ResultItems;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.pipeline.Pipeline;
import java.util.Date;

/**
 * Created by lenn on 16/8/2.
 */
public class DBArticlePipeline implements Pipeline {
    private ArticleService articleService;

    public DBArticlePipeline(ArticleService articleService) {
        this.articleService = articleService;
    }

    @Override
    public void process(ResultItems resultItems, Task task) {
        if(!resultItems.isSkip()){
            String title = resultItems.get("title");
            String content = resultItems.get("content");
            String coverImage = resultItems.get("coverImage");
            String tags = resultItems.get("tags");
            String source = resultItems.get("source");
            String sourceName = resultItems.get("sourceName");
            String publishTime = resultItems.get("publishTime");

            Article article = new Article(coverImage, title, content, source, ArticleStatus.PUBLISH.value(), null, null);
            // TODO 更改发布时间
            article.setPublishTime(new Date());
            article.setSourceName(sourceName);

            articleService.create(article);
        }
    }
}
