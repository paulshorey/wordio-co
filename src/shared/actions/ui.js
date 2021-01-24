/*
 * Open contact form
 */
export function open_contact_form(key, force = null) {
  try {
    window.document.querySelector(".eapps-form-floating-button").click();
  } catch (e) {
    window.alert("Please contact: paul@besta.domains   +1.385.770.6789");
  }
}
