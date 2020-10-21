export class UrlConfig {
    host = "http://localhost:9000"
    urlLogIn = this.host + "/api/auth/login"
    urlRegister = this.host + "/api/auth/register"
    urlCandidateResume = this.host + "/api/candidate/"
    urlCandidateReusmeSelfInfor = this.host + "/api/candidate/self-infor"
    urlUpdateCandidateReusme = this.host + "/api/candidate/candidate-resume"
    urlJobPosition = this.host + "/api/job-position"
    urlJobType = this.host + "/api/job-type"
    urlExperience = this.host + "api/experience"
    urlEducation = this.host + "api/education"
    urlSkill = this.host + "api/skill"
}
