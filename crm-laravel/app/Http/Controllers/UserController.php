<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function addCustomer(Request $request)
    {
        // $request->validate($request->all())
        // ;
        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email_address' => $request->email_address,
            'contact_number' => $request->contact_number
        ]);


        return response()->json(['message' => 'Successfully added customer']);
    }

    public function listCustomers()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function viewCustomer($id)
    {
        $user = User::find($id);

        return response()->json($user);
    }

    public function removeCustomer(Request $request)
    {

        User::find($request->id)->delete();

        return response()->json(['message' => 'User Deleted']);

    }

    public function updateCustomer(Request $request)
    {
        $id = $request->id;
        User::find($id)->update([
            'first_name' => $request->update_first_name,
            'last_name' => $request->update_last_name,
            'email_address' => $request->update_email_address,
            'contact_number' => $request->update_contact_number
        ]);

        return response()->json(['message' => "Successfully Updated User."]);
    }
}
