<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormValidator extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //nulable faz os campos serem opicionais porém filled não permite que caso sejam enviados, sejam enviados vazios.
            'nome' => 'nullable|string|max:255|filled',
            'sexo' => 'nullable|in:M,F|filled',
            'data_nascimento' => 'nullable|date|filled',
            'hobby' => 'nullable|string|max:255|filled',
            'nivel_id' => 'nullable|exists:niveis,id|filled',
        ];
    }

    //Sobrescrevendo o método já existente de mensagens para enviar erros personalizados
    public function messages()
    {
        return [
            'nome.required' => 'O nome do desenvolvedor é obrigatório.',
            'sexo.required' => 'O sexo é obrigatório.',
            'data_nascimento.required' => 'A data de nascimento é obrigatória.',
            'hobby.required' => 'O hobby é obrigatório.',
            'nivel_id.exists' => 'O nível selecionado não existe.',
        ];
    }
}
