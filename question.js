const questions = [
    {
        type: 'select',
        textQuestion: 'Решите уравнение: 2x + 5 = 17',
        trueAnswer: 'x = 6',
        allAnswers: [
            'x = 6',
            'x = 7',
            'x = 8',
            'x = 9'
        ],
    }, 
    {
        type: 'select',
        textQuestion: 'Чему равен корень уравнения x^2 - 9 = 0?',
        trueAnswer: 'x = 3',
        allAnswers: [
            'x = 3',
            'x = 6',
            'x = 9',
            'x = -6'
        ],
    },
    {
        type: 'select',
        textQuestion: 'Найдите значения выражения: 4(3x + 2) при x = 5',
        trueAnswer: '68',
        allAnswers: [
            '68',
            '70',
            '72',
            '74'
        ],
    },
    {
        type: 'select',
        textQuestion: 'Какой из следующих углов является тупым?',
        trueAnswer: '145 градусов',
        allAnswers: [
            '90 градусов',
            '180 градусов',
            '145 градусов',
            '45 градусов'
        ],
    },
    {
        type: 'input',
        textQuestion: 'Найдите площадь треугольника со сторонами 5, 12 и 13.',
        trueAnswer: '30'
    },
    {
        type: 'input',
        textQuestion: 'Какое число дополняет ряд 4, 7, 10, _, 16?',
        trueAnswer: '13'
    },
    {
        type: 'input',
        textQuestion: 'Если 5x - 3 = 17, то чему равно значение выражения 3x + 1?',
        trueAnswer: '13'
    }
]

let sequenceNumber = 0
let currentAnswer

const userAnswer = []

const createInfoEndBlock = () => {
    const containerInfo = document.getElementsByClassName('question')[0]

    let countTrueAnswer = 0

    for(let i = 0; i < userAnswer.length; i++){
        if (userAnswer[i] === true){
            countTrueAnswer += 1
        }
    }

    const createInfoBlock = document.createElement('div')
    createInfoBlock.classList.add('info')
    createInfoBlock.innerHTML = `Результат теста: ${countTrueAnswer}/${questions.length}`

    containerInfo.appendChild(createInfoBlock)

}

const createQuestionSelect = () => {
    if (questions.length <= sequenceNumber){
        return
    }

    const {type, textQuestion, trueAnswer, allAnswers} = questions[sequenceNumber]

    if (type !== 'select'){
        return
    }

    const containerQuestions = document.getElementsByClassName('question')[0]
    containerQuestions.innerHTML = ''

    countQuestion(containerQuestions)

    const createTextQuestion = document.createElement('div')
    createTextQuestion.classList.add('text-question')
    createTextQuestion.innerHTML = textQuestion

    containerQuestions.appendChild(createTextQuestion)

    for (let i = 0; i < allAnswers.length; i++){
        const createAnswerBlock = document.createElement('div')
        createAnswerBlock.classList.add('answer')
        createAnswerBlock.innerHTML = allAnswers[i]

        createAnswerBlock.addEventListener('click', () => {
            const oldSelect = document.getElementsByClassName('select')[0]

            createAnswerBlock.classList.toggle('select')

            if (oldSelect) {
                oldSelect.classList.remove('select')
            }
        })

        containerQuestions.appendChild(createAnswerBlock)
    }

    createButtonNext(trueAnswer)
}

const createQuestionInput = () => {
    if (questions.length <= sequenceNumber){
        return
    }

    const {type, textQuestion, trueAnswer} = questions[sequenceNumber]
    
    if (type !== 'input'){
        return
    }

    const containerQuestions = document.getElementsByClassName('question')[0]
    containerQuestions.innerHTML = ''

    countQuestion(containerQuestions)

    const createTextQuestion = document.createElement('div')
    createTextQuestion.classList.add('text-question')
    createTextQuestion.innerHTML = textQuestion

    containerQuestions.appendChild(createTextQuestion)

    const createUserInput = document.createElement('input')
    createUserInput.classList.add('js-input')
    createUserInput.placeholder = 'Ответ'
    createUserInput.type = 'number'

    createUserInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D+/g, "")
    })

    createUserInput.addEventListener('change', (e) => {

        currentAnswer = e.target.value
        
    })

    containerQuestions.appendChild(createUserInput)
    createButtonNext(trueAnswer)
}

const checkSelectedAnswer = (trueAnswer) => {
    if (questions.length <= sequenceNumber){
        return
    }

    if (document.getElementsByClassName('js-input')[0]){
        if (currentAnswer === trueAnswer){
            userAnswer[sequenceNumber] = true
        } else userAnswer[sequenceNumber] = false

        return
    }

    if (!document.getElementsByClassName('select')[0]){
        userAnswer[sequenceNumber] = false
        return
    }

    const userCurrentAnswerText = document.getElementsByClassName('select')[0].innerHTML
    const userCurrentAnswer = document.getElementsByClassName('select')[0]

    if (userCurrentAnswerText == trueAnswer){
        userAnswer[sequenceNumber] = true
    } else userAnswer[sequenceNumber] = false

    const answer = userAnswer[sequenceNumber]

    if (!answer){
        userCurrentAnswer.classList.add('incorrect')
    }
}

const countQuestion = (containerQuestions) => {
    const createCountQuestion = document.createElement('div')

    createCountQuestion.innerHTML = `Вопрос ${sequenceNumber + 1}/${questions.length}`
    createCountQuestion.classList.add('counter')

    containerQuestions.appendChild(createCountQuestion)
}

const createButtonNext = () => {
    const buttonsNavigation = document.getElementsByClassName('navigation')[0]

    const createButton = document.createElement('div')
    createButton.classList.add('next')
    createButton.classList.add('button')
    createButton.innerHTML = 'Следующий вопрос'

    document.getElementsByClassName('navigation')[0].style="display: block;"

    createButton.addEventListener('click', () => {
        buttonsNavigation.innerHTML = ''

        const trueAnswer = questions[sequenceNumber].trueAnswer
        
        checkSelectedAnswer(trueAnswer)

        setTimeout(() => {

            sequenceNumber += 1
            
            if (!questions[sequenceNumber]){
                createStartRestartWindow()
                return
            }

            renderQuestion()
        }, 500)
    })

    if (!document.getElementsByClassName('next')[0]){
        buttonsNavigation.appendChild(createButton)
    }
}

const createStartRestartWindow = () => {
    const buttonWrapper = document.getElementsByClassName('start-restart')[0]

    const buttonCreate = document.createElement('div')

    buttonCreate.classList.add('button')

    document.getElementsByClassName('navigation')[0].style="display: none;"

    if (sequenceNumber === 0){
        buttonCreate.innerHTML = 'Начать тест'
    }

    if (!questions[sequenceNumber]){
        sequenceNumber = 0

        document.getElementsByClassName('navigation')[0].innerHTML = ''
        document.getElementsByClassName('question')[0].innerHTML = ''

        createInfoEndBlock()

        buttonCreate.innerHTML = 'Перезапустить тест'
    }

    buttonCreate.addEventListener('click', () => {
        buttonWrapper.innerHTML = ''
        renderQuestion()
    })

    buttonWrapper.appendChild(buttonCreate)
}

const renderQuestion = () => {
    const currentQuestion = questions[sequenceNumber]
    
    if (currentQuestion.type === 'select') {
        createQuestionSelect()
    } else if (currentQuestion.type === 'input') {
        createQuestionInput()
    }
}

createStartRestartWindow()
