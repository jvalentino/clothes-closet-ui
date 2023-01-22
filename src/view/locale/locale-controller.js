import strings from "../../locale";

function generateLanguage(languageName, languageMap) {
  const result = {
    name: languageName,
    values: []
  };

  for (const [name, text] of Object.entries(languageMap)) {
    result.values.push({
      name: name,
      text: text
    });
  }

  return result;
}

function generateLanguages() {
  const languages = [];

  const en = this.generateLanguage("en", strings._props["en"]);
  languages.push(en);

  for (const [language, value] of Object.entries(strings._props)) {
    if (language != "en") {
      languages.push(this.generateLanguage(language, value));
    }
  }

  return languages;
}

export { generateLanguage, generateLanguages };
