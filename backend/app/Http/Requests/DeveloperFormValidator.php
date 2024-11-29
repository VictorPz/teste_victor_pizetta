<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeveloperFormValidator extends FormRequest
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
}
