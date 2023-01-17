import {CrewMember, DirectorOrWriter} from "../models/movie.model";

const REGEX_COUNTRY_CODE_BY_NAVIGATOR_LANGUAGE = /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i;
export function getCurrentCountryCodeByNavigatorLanguage(): string | null {
  const result = REGEX_COUNTRY_CODE_BY_NAVIGATOR_LANGUAGE.exec(navigator.language);
  if (!result || !result.length || !result[5]) {
    return null;
  }

  return result[5];
}



const JOB_TITLES = {
  DIRECTOR: "Director",
  WRITER: "Writer"
}
export function getDirectorsAndWriters(crewMembers: CrewMember[]): DirectorOrWriter[] {
  const directorsAndWriters: DirectorOrWriter[] = [];

  crewMembers.filter((crewMember: CrewMember) => {
    const isDirector: boolean = crewMember.job === JOB_TITLES.DIRECTOR;
    const isWriter: boolean = crewMember.job === JOB_TITLES.WRITER;

    if (!isDirector && !isWriter) {
      return;
    }

    const directorOrWriter: DirectorOrWriter | undefined = directorsAndWriters.find(
      directorOrWriter => directorOrWriter.name === crewMember.name
    );
    if (!directorOrWriter) {
      directorsAndWriters.push(
        new DirectorOrWriter(
          crewMember.original_name,
          crewMember.name,
          isDirector,
          isWriter
        )
      );
      return;
    }

    directorOrWriter.isDirector = isDirector || directorOrWriter.isDirector;
    directorOrWriter.isWriter = isWriter || directorOrWriter.isWriter;
  });

  return directorsAndWriters;
}
