package com.simpleboard.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardListRequest {

    int page;
    String startDate;
    String endDate;
    String category;
    String searchText;
}
