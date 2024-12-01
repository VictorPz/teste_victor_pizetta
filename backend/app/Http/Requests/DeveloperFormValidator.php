<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

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
        if ($this->isMethod('get')) {
            return [
                'nome' => 'nullable|string|max:255',
                'sexo' => 'nullable|in:M,F',
                'data_nascimento' => 'nullable|date',
                'hobby' => 'nullable|string|max:255',
                'nivel_id' => 'nullable|exists:niveis,id',
            ];
        }

        if ($this->isMethod('put')) {
            return [
                'nome' => 'filled|string|max:255',
                'sexo' => 'filled|in:M,F',
                'data_nascimento' => 'filled|date',
                'hobby' => 'filled|string|max:255',
                'nivel_id' => 'filled|exists:niveis,id',
            ];
        }

        return [
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string|max:255',
            'nivel_id' => 'required|exists:niveis,id',
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O campo nome deve ser uma string.',
            'nome.max' => 'O campo nome não pode exceder 255 caracteres.',

            'sexo.required' => 'O campo sexo é obrigatório.',
            'sexo.in' => 'O campo sexo deve ser um dos seguintes valores: M, F.',

            'data_nascimento.required' => 'O campo data de nascimento é obrigatório.',
            'data_nascimento.date' => 'O campo data de nascimento deve ser uma data válida.',

            'hobby.required' => 'O campo hobby é obrigatório.',
            'hobby.string' => 'O campo hobby deve ser uma string.',
            'hobby.max' => 'O campo hobby não pode exceder 255 caracteres.',

            'nivel_id.required' => 'O campo nível é obrigatório.',
            'nivel_id.exists' => 'O nível informado não existe.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();
        // Aqui você pode capturar os nomes dos campos que falharam
        $failedFields = implode(', ', array_keys($errors->toArray()));
        throw new HttpResponseException(
            response()->json([
                'message' => 'Por favor preencha corretamente o(s) campo(s): ' . $failedFields,
                'errors' => $errors,
            ], 400)
        );
    }
}
