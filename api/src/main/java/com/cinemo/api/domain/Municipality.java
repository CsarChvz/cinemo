package com.cinemo.api.domain;

import lombok.Data;

@Data
public class Municipality {

  private Long id;
  private String name;
  private State state;
}
