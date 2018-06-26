Feature("get req");

Scenario("test something", I => {
  I.amOnPage("/");
  I.see("Do you think that this is true?");
  I.click("Answer");
  I.see("Success");
});
