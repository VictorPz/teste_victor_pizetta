<?php

namespace App\Http\Controllers;

use App\Http\Requests\FormValidator;
use App\Models\Desenvolvedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DesenvolvedorController extends Controller
{
    // Criar devs
    public function store(FormValidator $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'nome' => 'required|string|max:255',
        //     'sexo' => 'required|in:M,F',
        //     'data_nascimento' => 'required|date',
        //     'hobby' => 'required|string|max:255',
        //     'nivel_id' => 'required|exists:niveis,id', // Garante que o nivel_id existe
        // ]);

        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }

        $desenvolvedor = Desenvolvedor::create([
            'nome' => $request->nome,
            'sexo' => $request->sexo,
            'data_nascimento' => $request->data_nascimento,
            'hobby' => $request->hobby,
            'nivel_id' => $request->nivel_id,
        ]);

        return response()->json($desenvolvedor, 201);
    }

    //Listar devs
    public function listDevs() {
        $desenvolvedores = Desenvolvedor::with('nivel')->get(); //sem o with('nivel') retorna apenas o id do nível e não o nome.
        return response()->json($desenvolvedores, 200);
    }

    //Editar devs
    public function updateDevs(FormValidator $request, $id)
    {
        // // Validação dos dados
        // $validator = Validator::make($request->all(), [
        //     'nome' => 'sometimes|required|string|max:255',
        //     'sexo' => 'sometimes|required|in:M,F',
        //     'data_nascimento' => 'sometimes|required|date',
        //     'hobby' => 'sometimes|required|string|max:255',
        //     'nivel_id' => 'sometimes|required|exists:niveis,id', // Garante que o nivel_id existe
        // ]);

        // // Se a validação falhar, retorna erro
        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }

        // Busca o desenvolvedor pelo ID
        $desenvolvedor = Desenvolvedor::find($id);

        // Se o desenvolvedor não for encontrado, retorna erro 404
        if (!$desenvolvedor) {
            return response()->json(['message' => 'Desenvolvedor não encontrado'], 404);
        }

        // Atualiza os campos com base no que foi passado na requisição
        $desenvolvedor->update($request->only(['nome', 'sexo', 'data_nascimento', 'hobby', 'nivel_id']));

        // Retorna a resposta com os dados do desenvolvedor atualizado
        return response()->json($desenvolvedor);
    }

    //Excluir devs

    public function excludeDevs($id)
    {
        $desenvolvedor = Desenvolvedor::find($id);

        if (!$desenvolvedor) {
            return response()->json(['message' => 'Desenvolvedor não encontrado'], 404);
        }

        $desenvolvedor->delete();

        return response()->json(['message' => 'Desenvolvedor excluído com sucesso'], 200);
    }
}

