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
    public function listDevs(DeveloperFormValidator $request) {

        $nome = $request->input('nome');
        $sexo = $request->input('sexo');
        $data_nascimento = $request->input('data_nascimento');
        $hobby = $request->input('hobby');
        $nivelId = $request->input('nivel_id');

        $perPage = $request->input('per_page', 10);

        $query = Developer::with('nivel'); //sem o with('nivel') retorna apenas o id do nível e não o nome.

        if ($nome) {
            $query->where('nome', 'like', '%' . $nome . '%');
        }
        if ($sexo) {
            $query->where('sexo', $sexo);
        }

        if ($data_nascimento) {
            $query->whereDate('data_nascimento', '=', $data_nascimento);
        }

        if ($hobby) {
            $query->where('hobby', 'like', '%' . $hobby . '%');
        }

        if ($nivelId) {
            $query->where('nivel_id', $nivelId);
        }

        $developers = $query->paginate($perPage);

        if ($developers->isEmpty()) {
            return response()->json(['message' => 'Nenhum desenvolvedor encontrado'], 400);
        }

        return response()->json([
            'data' => $developers->items(),
            'meta' => [
                'total' => $developers->total(),
                'per_page' => $developers->perPage(),
                'current_page' => $developers->currentPage(),
                'last_page' => $developers->lastPage(),
            ]], 200);
    }

    //Editar devs
    public function updateDevs(DeveloperFormValidator $request, $id)
    {
        $developer = Developer::find($id);

        if (!$developer) {
            return response()->json(['message' => 'Desenvolvedor não encontrado'], 400);
        }

        $developer->update($request->only(['nome', 'sexo', 'data_nascimento', 'hobby', 'nivel_id']));

        return response()->json([
            'id' => $developer->id,
            'nome' => $developer->nome,
            'sexo' => $developer->sexo,
            'data_nascimento' => $developer->data_nascimento,
            'nivel_id' => $developer->nivel_id,
            'hobby' => $developer->hobby,
        ]);
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

