const CommentSchema = {
    id: {
        type: Number
    },
    usuario: {
        type: String,
        required: true,
    },
    avaliacao: {
        type: Number,
        required: true,
    },
    comentario: {
        type: String,
        required: true,
    },
};

export default CommentSchema;