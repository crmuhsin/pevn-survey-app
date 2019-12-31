import users from './user'
import questions from './questions'
import survey from './survey'
import response from './response'
export default app => {
    app.use('/api/v1/users', users)
    app.use('/api/v1/questions', questions)
    app.use('/api/v1/survey', survey)
    app.use('/api/v1/response', response)
}