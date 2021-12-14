Feature: Editing todos

  Background:
    Given a todo list with items:
      | buy some cheese |
      | buy some milk   |

  Scenario: Editing the text of an existing todo
    When I edit the todo "buy some milk" to "buy some sausages"
    Then the todos are:
      | buy some cheese   |
      | buy some sausages |

  Scenario: Editing the text to an empty string removes the todo
    When I edit the todo "buy some milk" to ""
    Then the todos are:
      | buy some cheese |
