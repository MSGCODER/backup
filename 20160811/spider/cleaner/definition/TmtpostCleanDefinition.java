package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/8/1.
 */
public class TmtpostCleanDefinition extends HulkUrlCleanDefinition {
    private String[] regex = {
            "http://www\\.tmtpost\\.com/.+\\.html#?",
            "http://www\\.tmtpost\\.com/tag/.*"
    };

    @Override
    public String[] getRegex() {
        return regex;
    }
}
