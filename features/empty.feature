Feature: Empty

  Background:
    Given an empty todo list

  Scenario: simpler ui
    Then no todos are listed

  Scenario: autofocus
    Then my cursor is ready to create a todo