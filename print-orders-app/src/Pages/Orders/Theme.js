const orderItemThemes = {
    pending: {
        bgColor: '#ffccbc',
        statusColor: '#7f0000' 
    },
    awaiting: {
        bgColor: '#ffca28',
        statusColor: '#ef6c00'
    },
    done: {
        bgColor: '#a5d6a7',
        statusColor: '#1b5e20'
    }

}

const makeTheme = status => orderItemThemes[status]

export default makeTheme