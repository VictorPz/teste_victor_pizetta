<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LevelFormValidator extends FormRequest
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
                'nivel' => 'nullable|string|max:255',
            ];
        }

        return [
            'nivel' => 'required|string|unique:niveis|max:255|',
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
