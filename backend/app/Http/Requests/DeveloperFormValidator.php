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
                'nome' => 'nullable|string|max:255',
                'sexo' => 'nullable|in:M,F',
                'data_nascimento' => 'nullable|date',
                'hobby' => 'nullable|string|max:255',
                'nivel_id' => 'nullable|exists:niveis,id',
            ];
        }

        return [
            //nulable faz os campos serem opicionais porém filled não permite que caso sejam enviados, sejam enviados vazios.
            'nome' => 'required|string|max:255',
            'sexo' => 'required|in:M,F',
            'data_nascimento' => 'required|date',
            'hobby' => 'required|string|max:255',
            'nivel_id' => 'required|exists:niveis,id',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Por favor preencha corretamente os campos',
                'errors' => $validator->errors(),
            ], 400)
        );
    }
}
