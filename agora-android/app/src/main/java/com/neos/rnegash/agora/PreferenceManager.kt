package com.neos.rnegash.agora

import android.content.Context

class PreferenceManager (context: Context){
    val PREFS_FILE = "com.neos.rnegash.agora.prefs"
    val TOKEN = "token"

    val preference = context.getSharedPreferences(PREFS_FILE,Context.MODE_PRIVATE)

    fun getToken(): String{
        return preference.getString(TOKEN, "token")
    }

    fun setToken(token: String){
        val editor = preference.edit()
        editor.putString(TOKEN, "Bearer $token")
        editor.apply()
    }

}