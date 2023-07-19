package com.jwt.security.requestResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchCourseRequest {
    private String title;
    private boolean hasCertificate;
    private boolean isFree;
    private int maxDistance;
}
