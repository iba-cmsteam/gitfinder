$(document).ready(searchUser);

function searchUser() {
	
	$('#search-user').on('keypress', function(e){
			 if(e.which === 13 && $('#search-user').val()){

			 	var search = $('#search-user').val();

				 	//make request to github
				 	$.ajax({
				 			
				 			url: 'https://api.github.com/users/' + search

				 	}).done(function(user){
				 			console.log(user);
				 			$.ajax({

				 				url: 'https://api.github.com/users/' + search + '/repos'

				 			}).done(function(repos){

				 					$.each(repos, function(index, repo){
				 								$('#repos').append(`
														<div class="well">						
															<div class="row">
																 <div class="col-md-7">
																		 <strong>${repo.name}</strong>: ${repo.description}
																 </div>
																 <div class="col-md-3">
																		 <h4><span class="label label-default">Forks:  ${repo.forks_count}</span></h4>
																		 <h4><span class="label label-primary">Watchers: ${repo.watchers_count}</span></h4>
																		 <h4><span class="label label-success">Stars: ${repo.stargazers_count}</span></h4>
																 </div>
																 <div class="col-md-2">
																		 <a class="btn btn-default btn-block" href="${repo.html_url}" target="_blank">Repo Page</a>				
																 </div>
															</div>
														</div>
				 									`);
				 					});
				 			});

				 			$('#profile').html(`
										<div class="panel panel-default">
										  <div class="panel-heading">
										    <h3 class="panel-title">${user.name}	</h3>
										  </div>
										  <div class="panel-body">
										    	<div class="row">
															<div class="col-md-3">
																	<img class="thumbnail" src="${user.avatar_url}">
																	<a class="btn btn-default btn-block" href="${user.html_url}" target="_blank">Git Hub Url</a>
															</div>
															<div class="col-md-9">
																	<h4><span class="label label-default">Public Repos:  ${user.public_repos}</span></h4>
																	<h4><span class="label label-primary">Public Gists: ${user.public_gists}</span></h4>
																	<h4><span class="label label-success">Followers: ${user.followers}</span></h4>
																	<h4><span class="label label-info">Following: ${user.following}</span></h4>
																	<br><br>
																	<ul class="list-group">
																			<li class="list-group-item">Company: ${user.company}</li>
																			<li class="list-group-item">Website/blog: ${user.blog}</li>
																			<li class="list-group-item">Location: ${user.location}</li>
																			<li class="list-group-item">Member Since: ${user.created_at}</li>
																	<ul>
															</div>

										    	</div>
										  </div>
										</div>
									<h3 class="page-header">Latest repos</h3>
									<div id="repos">	</div>
				 				`);

				 	});
			}
	});
}
