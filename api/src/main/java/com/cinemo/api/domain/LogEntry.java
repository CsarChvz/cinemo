package com.cinemo.api.domain;


import java.time.LocalDateTime;

import lombok.Data;

@Data
public class LogEntry {
    private LocalDateTime entryDate;
}
