<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeveloperFormValidator;
use App\Models\Developer;
use Illuminate\Support\Facades\DB;

class DeveloperController extends Controller
{
    // Criar devs
    public function store(DeveloperFormValidator $request)
    {
        $developer = Developer::create([
            'nome' => $request->nome,
            'sexo' => $request->sexo,
            'data_nascimento' => $request->data_nascimento,
            'hobby' => $request->hobby,
            'nivel_id' => $request->nivel_id,
        ]);

        return response()->json($developer, 201);
    }

    //Listar devs
    public function listDevs() {
        $developers = Developer::with('nivel')->get(); //sem o with('nivel') retorna apenas o id do nível e não o nome.

        if ($developers->isEmpty()) {
            return response()->json(['message' => 'Nenhum desenvolvedor encontrado'], 400);
        }

        return response()->json($developers, 200);
    }

    //Editar devs
    public function updateDevs(DeveloperFormValidator $request, $id)
    {
        $developer = Developer::find($id);

        if (!$developer) {
            return response()->json(['message' => 'Desenvolvedor não encontrado'], 400);
        }

        $developer->update($request->only(['nome', 'sexo', 'data_nascimento', 'hobby', 'nivel_id']));

        return response()->json($developer);
    }

    //Excluir devs
    public function excludeDevs($id)
    {
        $developer = Developer::find($id);

        if (!$developer) {
            return response()->json(['message' => 'Desenvolvedor não encontrado'], 400);
        }

        $developer->delete();

        if ($developer::count() == 0) {
            DB::statement('ALTER TABLE desenvolvedores AUTO_INCREMENT = 1');
        }

        return response()->json(['message' => 'Desenvolvedor excluído com sucesso'], 200);
    }
}

