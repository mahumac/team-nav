package com.tuituidan.openhub.bean.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * CardDto.
 *
 * @author tuituidan
 * @version 1.0
 * @date 2021/3/7
 */
@Getter
@Setter
public class CardDto {

    /**
     * id 有值为编辑，无值为新增
     */
    private String id;

    /**
     * 判断是原型还是普通
     */
    private String type;

    /**
     * 分类ID
     */
    private String category;

    /**
     * icon
     */
    private String icon;

    /**
     * 结构化数据的icon
     */
    private CardIconDto iconDto;

    private String title;

    private String content;

    private String url;

    private String zip;

    private CardZipDto zipDto;

    private Integer sort;

}