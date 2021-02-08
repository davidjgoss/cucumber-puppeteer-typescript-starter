Feature: Adding todos

  Background:
    Given an empty todo list

    Scenario:
      When I add the todo "buy some cheese"
      Then the todos are:
      | buy some cheese |
      And my cursor is ready to create a todo
