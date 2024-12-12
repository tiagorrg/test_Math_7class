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
        textQuestion: 'Сосал?',
        trueAnswer: 'Да',
        allAnswers: [
            'Да',
            'Нет',
            'Вчера'
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
    if (questions.length < sequenceNumber){
        return
    }

    const {type, textQuestion, trueAnswer, allAnswers} = questions[sequenceNumber]

    if (type !== 'select'){
        return
    }

    const containerQuestions = document.getElementsByClassName('question')[0]
    containerQuestions.innerHTML = ''

    const createTextQuestion = document.createElement('div')
    createTextQuestion.classList.add('text-question')
    createTextQuestion.innerHTML = textQuestion

    containerQuestions.appendChild(createTextQuestion)

    console.log('создание блоков ответа')

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
    if (questions.length < sequenceNumber){
        return
    }

    const {type, textQuestion, trueAnswer} = questions[sequenceNumber]
    
    if (type !== 'input'){
        return
    }
    console.log(113, trueAnswer)
    const containerQuestions = document.getElementsByClassName('question')[0]
    containerQuestions.innerHTML = ''

    const createTextQuestion = document.createElement('div')
    createTextQuestion.classList.add('text-question')
    createTextQuestion.innerHTML = textQuestion

    containerQuestions.appendChild(createTextQuestion)

    console.log('создание блоков ответа')

    const createUserInput = document.createElement('input')
    createUserInput.classList.add('js-input')
    createUserInput.placeholder = 'Ответ'

    createUserInput.addEventListener('change', (e) => {

        currentAnswer = e.target.value
        console.log(currentAnswer)
        
    })

    containerQuestions.appendChild(createUserInput)
    console.log(141, trueAnswer)
    createButtonNext(trueAnswer)
}

const checkSelectedAnswer = (trueAnswer) => {
    if (questions.length <= sequenceNumber){
        return
    }

    if (document.getElementsByClassName('js-input')[0]){
        console.log('js-input есть', currentAnswer, trueAnswer)
        if (currentAnswer === trueAnswer){
            userAnswer[sequenceNumber] = true
        } else userAnswer[sequenceNumber] = false
        console.log(userAnswer)
        return
    }

    if (!document.getElementsByClassName('select')[0]){
        userAnswer[sequenceNumber] = false
        return
    }

    console.log('js-input нет')

    const userCurrentAnswerText = document.getElementsByClassName('select')[0].innerHTML
    const userCurrentAnswer = document.getElementsByClassName('select')[0]

    console.log('Текст ответа', userCurrentAnswerText)
    console.log('trueAnswer', trueAnswer)
    if (userCurrentAnswerText == trueAnswer){
        userAnswer[sequenceNumber] = true
    } else userAnswer[sequenceNumber] = false

    console.log(userAnswer)

    const answer = userAnswer[sequenceNumber]

    console.log('Состояние ответа', answer)

    if (!answer){
        userCurrentAnswer.classList.add('incorrect')
    }
}

const createButtonNext = () => {
    const buttonsNavigation = document.getElementsByClassName('navigation')[0]

    const createButton = document.createElement('div')
    createButton.classList.add('next')
    createButton.classList.add('button')
    createButton.innerHTML = 'Следующий вопрос'


    createButton.addEventListener('click', () => {
        buttonsNavigation.innerHTML = ''

        const trueAnswer = questions[sequenceNumber].trueAnswer

        console.log('нажал', 'trueAnswer', trueAnswer)
        
        checkSelectedAnswer(trueAnswer)

        setTimeout(() => {
            console.log('переход к новому вопросу')

            sequenceNumber += 1
            
            if (!questions[sequenceNumber]){
                createStartRestartWindow()
                return
            }

            createQuestionSelect()
            createQuestionInput()
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
        createQuestionSelect()
    })

    buttonWrapper.appendChild(buttonCreate)
}

createStartRestartWindow()
